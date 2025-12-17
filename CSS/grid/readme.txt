grid:
used to create layout in CSS

here we can align any item at any place

grid-template-columns: used to divide the elemnet into parts and set the column size
grid-template-rows: used to divide the elemnet into parts and set the row size


the lines in grid are called grid lines and the boxes are called grid cell
the area between two lines is grid track and the area randomly you take is gris area

grid lines are indexed as 1,2,3 or in negative index of -1,-2 etc
you can put elemnet inside the grid cells as your wish

you can name your grid line according to your convinience
gid-template-row: [pehla] 100px [doosra] 100px;

to change the positiion of a elemnetset
grid-row:1/2  or grid-column:1/2
it means the grid row starts from 1 line and end at 2 line
simliarly for the column
it details you may mention:
grid-row-start/end:1;

if you do 1 element exchage it automatically push the content to next
to overlap you use the same property there also


part-2

we can name a grid area upto your convinience
like some cells are for nav bar, some for content, for footer etc
to assign use {grid-template-areas} property
to assign then use {grid-area:}

fr unit:
special unit used in grid mostly
it defines as the fraction of the given width or height
eg 1fr 1fr 1fr -> 1/3 1/3 1/3

gap property:
to use gap in grid
row-gap/ column-gap for individual separate grid gaps

you can align and justify items with using: align-items and justify-items

for individual cell- use jestify/align-self

to repeat same thing use repeat(no of times, that to be repeated)

you may use minmax for definig min and max grid length

use align-content/justify-content for hange place of the grid

***to mark both align and justify as center use: place-content as well as place-items