/**
 * Author: r1cardohj
 * Date: 20240802
 * LISENCE: MIT
 */

let lines = 0

const COMMAND_LINE_$ = "r1cardohj@blog:"

function render$(path) {
    return `${COMMAND_LINE_$}${path}$`;
}

function render_home() {
    return render$("~")
}


function enter_callback(cmd) {
    handle_command(cmd)
    new_line_ask()
}

function init() {
    new_line_ask()
}

function disable_last_input() {
    last_input = document.getElementsByClassName("input-position")[lines]
    if (last_input)
        last_input.disabled = true
}

function new_line_ask() {
    disable_last_input()
    lines++
    let shell = document.getElementById("shell")
    let new_line_p = document.createElement("p")
    new_line_p.id = "cmd-" + lines;
    let new_input = document.createElement("input")
    new_input.classList.add("input-position")
    new_input.setAttribute("type", "text")
    new_line_p.append(render$("~"), new_input)
    shell.appendChild(new_line_p)
    new_input.addEventListener("keydown", (event) => {
         if (event.key == "Enter") {
             enter_callback(new_input.value)
         }
    })
    new_input.focus()
}

function new_line_resp(content) {
    let shell = document.getElementById("shell")
    let new_line_p = document.createElement("p")
    new_line_p.append(content)
    shell.appendChild(new_line_p)
}

function handle_command(cmd) {
    switch(cmd) {
        case "ls":
            ls()
            break
        case "whoami":
            whoami()
            break
        case "about":
            about()
            break
    }
}

/**
 *Command
 */

function ls() {
    new_line_resp("total 2")
    new_line_resp("-r--r--r--  1 r1cardohj r1cardohj 4009 May 19:43 About this blog")
    new_line_resp("-r--r--r--  1 r1cardohj r1cardohj 4022 May 12:00 my-blog-2024")
}

function whoami() {
    new_line_resp("r1cardohj")
}

function about() {
    new_line_resp("这是一个博客的demo,我在考虑是用纯js实现一个静态页面还是前后端分离.")
}


function main() {
    init()
}

main()
