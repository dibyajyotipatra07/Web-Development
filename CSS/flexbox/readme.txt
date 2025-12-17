used to easier our css task
**it only used on the container 

display flex: applied by default
justify-content:
center: make it center horizontal center

flex-end: at end
flex-start: at start
space-around: given spaces outside them like margin
space-between: only between thwm


align-items: bring it to vertical center

flex-direction:
row: left to right
row-reverse: right to left
column: top to bottom
column-reverse: bottom to top

justify content firstly see the flex direction then applies to the main axis

in column main axis is vertical and in row main axis is horizontal

main start and main end are the point where the main axis starts and ends
similiary for the cross axis

main size and cross size are the distance between start and end point of both main and cross axis

flex-wrap: wrap
here the elements are wrapped down... when you shows large content in pc you have to show it below in multiple rows in phones, at that place the wrap text is used
:wrap-reverse
used to reverse the wrap

align-content: center
it applies where multiples lines are there
maily bring the wholw content to center

there is no justifyitem in flexbox

flex-flow: <flex-direction> <flex-wrap>;
mainly used to use both flex direction and flex wrap in one go

gap property:
maily used to set gap between elemnets(applied on both row and column)
for individual: row-gap, column-gap

for integration use gap:<row> <column>

item property
order: to set the order of individual items
the higher the order the last the elements place
default orderis 0

flex-grow:
ability to grow item and takes the place of multiple elements

flex-shrink:
ability to shrink item