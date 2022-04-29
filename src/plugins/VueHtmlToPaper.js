// https://stackoverflow.com/questions/64824171/how-to-print-a-specific-element-in-vue-3
// Author: Harun
// A modification of the vue Html-to-paper plugin to work in Vue 3
// https://www.npmjs.com/package/vue-html-to-paper
function addStyles(win, styles) {
  styles.forEach((style) => {
    let link = win.document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", style);
    win.document.getElementsByTagName("head")[0].appendChild(link);
  });
}

/*
 * @problem: Sometimes .cloneNode(true) doesn't copy the styles and your are left
 * with everything copied but no styling applied to the clonedNode (it looks plain / ugly). Solution:
 * 
 * @solution: call synchronizeCssStyles to copy styles from source (src) element to
 * destination (dest) element.
 * 
 * @author: Luigi D'Amico (www.8bitplatoon.com)
 * 
 */
function synchronizeCssStyles(src, destination, recursively) {

    // if recursively = true, then we assume the src dom structure and destination dom structure are identical (ie: cloneNode was used)

    // window.getComputedStyle vs document.defaultView.getComputedStyle 
    // @TBD: also check for compatibility on IE/Edge 
    destination.style.cssText = document.defaultView.getComputedStyle(src, "").cssText;

    if (recursively) {
        var vSrcElements = src.getElementsByTagName("*");
        var vDstElements = destination.getElementsByTagName("*");

        for (var i = vSrcElements.length; i--;) {
            var vSrcElement = vSrcElements[i];
            var vDstElement = vDstElements[i];
//          console.log(i + " >> " + vSrcElement + " :: " + vDstElement);
            vDstElement.style.cssText = document.defaultView.getComputedStyle(vSrcElement, "").cssText;
        }
    }
}

const VueHtmlToPaper = {
  install(app, options = {}) {
    app.config.globalProperties.$htmlToPaper = (
      el,
      localOptions,
      cb = () => true
    ) => {
      let 
        defaultStyles = [];
      let {
        styles = defaultStyles
      } = options;

      // If has localOptions
      // TODO: improve logic
      if (localOptions) {
        if (localOptions.styles) styles = localOptions.styles;
      }

      //const element = window.document.getElementById(el);
      const element = el;

      if (!element) {
        alert(`Element to print #${el} not found!`);
        return;
      }

      var ifprint = document.createElement("iframe");
      document.body.appendChild(ifprint);
      ifprint.setAttribute("style","height:0;width:0;");

      const win = ifprint.contentWindow;

      // win.document.write(`
      //   <!DOCTYPE html>
      //     <head>
      //       <title>${window.document.title}</title>
      //     </head>
      //     <body>
      //       ${element.outerHTML}
      //     </body>
      //   </html>
      // `);

      win.document.write(`
        <!DOCTYPE html>
          <head>
            <title>${window.document.title}</title>
          </head>
          <body>
          </body>
        </html>
      `);
      const newNode = win.document.importNode(element, true);
      win.document.body.appendChild(newNode);

      addStyles(win, styles);
      synchronizeCssStyles(element, newNode, true);
      

      setTimeout(() => {
        win.document.close();
        win.focus();
        win.print();
        win.close();
        document.body.removeChild(ifprint);
        cb();
      }, 500);

      return true;
    };
  }
};

export default VueHtmlToPaper;