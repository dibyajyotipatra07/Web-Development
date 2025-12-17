transform is to perfom things on axis, it may be 3d or 2d
to use this, use attribute transform:

rotate():
    parameters:
        xdeg - roatate elemnt in specified degree
        xturn - 1 turn is 360 degree, 0.25 is 90 degree
rotateX/Y/Z:
    to rotate canvas in axis 
    ---> xaxis
    <----- yaxis
    . into is zaxis
    i.e: rotateX(90 degree) -- invisible

scale():
    ti increase sixe or decrease size
    it may be in axis specified like scalex()
    scale3d trasform it in 3d

skew()
    you may do it in x/y axis but not in z
tramslate():
    to move the element
    you may specify the axis
    by default it is in x direction

to apply multiple transform property, use it in single transform sentence:
    transform: skew() tramslate();

to set the origin about which the elemnet rotate
    origin()