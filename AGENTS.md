# Agent Instructions (Project-Specific)

*Project-specific instructions/information for CA*

## About this project/app

* **Name:** Idea Site  
* **Type:** Website for a software development company  
* **Tech Stack:** HTML, CSS, JavaScript (vanilla)  
* **Notes:**  
  * This is a cloning project where we clone the legacy website that’s already available at [https://ideaxplode.com](https://ideaxplode.com) (which was built using [Bubble.io](http://Bubble.io)).  
  * For this project, we’re cloning from the original to rebuild it EXACTLY using plain HTML+CSS+JS.   
  * The index.html was originally saved from Chrome using the “web page, complete” option.  
  * We have changed/edited the index.html so far to make it standalone without having any [Bubble.io](http://Bubble.io) dependencies; we also should continue to do so.  
  * You can still find a copy of the originally saved Chrome files at `./cloning-inputs/original.html` and the folder `original_files` in the same path. You can use this for your reference while cloning/editing various aspects of the site/page that we're developing.
  * You can find the complete, scrolled screenshot, for your reference, here: **./cloning-inputs/screenshot.png**  
  * You can also browse the live site (at aforementioned URL) to compare with your implementation using the browser tool; you may have to hover/click on items to understand their true behaviours.

## Browser Tool (Vercel’s agent-browser)

1. **How to use:** For direct/manual browser actions, use **agent-browser** commands directly (example: **agent-browser \--session dev open http://localhost:\<port\>** (you can use the active dev URL), then **agent-browser \--session dev snapshot \-i**).  
2. **Headless/Headed mode:** You should run the browser in headless mode unless you’re instructed to run the browser “visually”; finally, close the session yourself – for both headless/headed modes.  
3. **Headed/Visual mode:** Always open browser window maximized in headed mode e.g. **agent-browser \--session dev \--headed \--args "--start-maximized" open http://localhost:3000**
