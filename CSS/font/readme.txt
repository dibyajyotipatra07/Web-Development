We can change font using font-family
more that one font are called fallback fonts- if the 1st font is not availbale in your system, it will use the followig one and so on

font-style:
-italic
-oblique
-normal

font-weight:
-to make it bolder or lighter
-(100-1000) 
-bolder

text-decoration:
-for underline, overline

use google fonts:
-link[use link tag]
-import[use style tag]

special font: ballu bhai
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@400..800&display=swap" rel="stylesheet">


<style>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@400..800&display=swap');
</style>

font-family: "Baloo Bhai 2", sans-serif;

poppins and baloo bhai 2
<style>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@400..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>

font-properties;
-font-size *size of font
-line-height *line spacing
-letter-spacing
-text-transform * to make it uppercase, lowercase, capitalize
-text-decoration *to add uderline etc
-text-decoration-color *to add decoration color
-text-decoration-thickness *to increse or decrease the size of the decoration
-text-indent * add indentation
-text-overflow * ellipsis and clip (hide or inline)
-overflow *what to do when overflow (hidden, scroll, normal)
-word-break *word break when overflow or not(break-all, keep-all)
-text-align *alignment of text



colors in CSS;
-use color tag
types
*color keywords (use direct color names)
*HEX color code (use hex values, starts with #rrggbb){"https://htmlcolorcodes.com/"}
*RGB (rgb(red,green,blue)) range from 0-255
*RGBA (rgba(red,green,blue, alpha))range from 0-255, alpha from 0-1 {alpha is the opacity}
*HSL (hsl(hue,saturation,lightness)) 

background-color:
-to give background of that elemnet that you have selected through selector throught the above types