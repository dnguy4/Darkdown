<template>
  <button @click="makePDF" class="button">Export to PDF</button>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  methods: {
    //https://stackoverflow.com/questions/17293135/download-a-div-in-a-html-page-as-pdf-using-javascript
    makePDF: function (){
      let html_content = document.getElementsByClassName("ck-content")[0]; //use vue ref instead to get from parent
      let HTML_Width = html_content.offsetWidth;
      let HTML_Height = html_content.offsetHeight;
      let top_left_margin = 15;
      let PDF_Width = HTML_Width + (top_left_margin * 2);
      let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
      let canvas_image_width = HTML_Width;
      let canvas_image_height = HTML_Height;

      let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

      html2canvas(html_content,  {
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: html_content.offsetWidth,
        windowHeight: html_content.scrollHeight,
        allowTaint: true, 
        useCORS: true
      }).then(function (canvas) { //need to use a proxy or convert to base64
          let imgData = canvas.toDataURL("image/png", 1.0);
          let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
          pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
          for (let i = 1; i <= totalPDFPages; i++) { 
              pdf.addPage(PDF_Width, PDF_Height);
              pdf.addImage(imgData, 'PNG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
          }
          pdf.save("Your_PDF_Name.pdf");
      });
      },
      // https://stackoverflow.com/questions/2109205/open-window-in-javascript-with-html-inserted
      makeWebpage: function (){
        //Kluver advises launching a new vue component to handle it
        //current issue: need to pass in css
        let winHtml = document.getElementsByClassName("ck-content")[0].innerHTML;
        const winUrl = URL.createObjectURL(
          new Blob([winHtml], { type: "text/html" })
        );
        window.open(
            winUrl,
            "win",
            `width=800,height=400,screenX=200,screenY=200`
        );
      }
  },
};
</script>

<style scoped>

</style>