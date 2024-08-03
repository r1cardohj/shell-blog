/**
 * Author: r1cardohj
 * Date: 20240802
 * LISENCE: MIT
 */
import configs from "./configs.js";

const context = {
    line: -1,
    current_path: "~",
    history_commands: [],
    current_user: configs.user_name,
    host_name: configs.host_name,
    history_commands_ptr:-1 
}

const defaultCommands = [
    ls,
    whoami,
    about,
    clear
]

const COMMAND_LINE_$ = `${context.current_user}@${context.host_name}` 

function render$(path) {
    return `${COMMAND_LINE_$}${path}$`;
}

function render_home() {
    return render$("~")
}

/**
 * keyborad callback
 */

function enter_callback(cmd) {
    handle_command(cmd)
    new_line_ask()
}

function tab_callback(cmd) {
    const arr = cmd.split(" ")
    if (arr.length > 1) {
        prompt_args(cmd)
    } else {
        prompt_command(cmd)
    }
}

function arrow_up_callback()  {
    if (context.history_commands_ptr > 0) {
        context.history_commands_ptr--
        get_current_input().value = context.history_commands[context.history_commands_ptr]
    }

}

function arrow_down_callback() {
    if ( context.history_commands_ptr < context.history_commands.length - 1) {
        context.history_commands_ptr++
        get_current_input().value = context.history_commands[context.history_commands_ptr]
    }
}

function prompt_command(cmd) {
    for(let idx in defaultCommands) {
        const command_name = defaultCommands[idx].name
        if (command_name.startsWith(cmd) && command_name != cmd)
            get_current_input().value = command_name
    }
}

function prompt_args(cmd) {
    //todo
}


function init() {
    new_line_ask()
}

function disable_last_input() {
    let last_input = document.getElementsByClassName("input-position")[context.line-1]
    if (last_input)
        last_input.disabled = true
}

function get_current_input() {
    return document.getElementsByClassName("input-position")[context.line]
}

function new_line_ask() {
    disable_last_input()
    let shell = document.getElementById("shell")
    let new_line_p = document.createElement("p")
    new_line_p.id = "cmd-" + context.line;
    let new_input = document.createElement("input")
    new_input.classList.add("input-position")
    new_input.setAttribute("type", "text")
    new_line_p.append(render_home(), new_input)
    shell.appendChild(new_line_p)
    new_input.addEventListener("keydown", (event) => {
         if (event.key == "Enter") {
             enter_callback(new_input.value)
         } else if (event.key == "Tab") {
            event.preventDefault()
            tab_callback(new_input.value)
         } else if (event.key == "ArrowUp") {
            event.preventDefault()
            arrow_up_callback()
         } else if (event.key == "ArrowDown") {
            arrow_down_callback()
         }
    })
    new_input.focus()
    context.line++
}

function new_line_resp(content) {
    let shell = document.getElementById("shell")
    let new_line_p = document.createElement("p")
    new_line_p.append(content)
    shell.appendChild(new_line_p)
}

function handle_command(cmd) {
    for(let i in defaultCommands) {
        if (cmd === defaultCommands[i].name) {
            defaultCommands[i]()
        }
    }
    if (cmd !== "") {
        context.history_commands.push(cmd)
        context.history_commands_ptr = context.history_commands.length;
    }
}

/**
 * Command define
 */

function ls() {
    new_line_resp("total 2")
    new_line_resp("-r--r--r--  1 r1cardohj r1cardohj 4009 May 19:43 About-this-blog")
    new_line_resp("-r--r--r--  1 r1cardohj r1cardohj 4022 May 12:00 my-blog-2024")
}

function whoami() {
    new_line_resp(context.current_user)
}

function about() {
    new_line_resp("这是一个博客的demo,我在考虑是用纯js实现一个静态页面还是前后端分离.")
}

function clear() {
    document.body.innerHTML = ""
    const shell = document.createElement("div")
    shell.id = "shell"
    document.body.appendChild(shell)
    context.line = -1
    //new_line_ask()
}


function main() {
    init()
}

main()
