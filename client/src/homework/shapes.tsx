import React from 'react'

type Dot = {
    x: number
    y: number
    size: number
    shape: "square" | "circle" | "plus"
    color: string
    birth: number
    speed: number
}

type HomeworkProps = {
    count?: number
}
type HomeworkState = {
    data: Dot[]
}

class Homework extends React.Component<HomeworkProps, HomeworkState> {

    ref: HTMLCanvasElement | null = null
    ctx: CanvasRenderingContext2D | null = null
    timerId: number | null = null
    state = {
        data: []
    }

    constructor(props: HomeworkProps) {
        super(props)
    }

    generateDot = (x: number, y: number) => {
        const newDot: Dot = {
            x, y,
            size: Math.floor(Math.random()*30+10),
            shape: Math.random()<0.333?"circle":(Math.random()<.5?"square":"plus"),
            color: `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255})`,
            birth: Date.now(),
            speed: Math.random()*4.
            
        }
        return newDot
    }
    
    addDot = (x: number, y: number) => {
        const newDot: Dot = this.generateDot(x,y)
        this.setState({
            data: [...this.state.data, newDot]
        })
    }

    drawDot = (dot: Dot) => {
        if (!this.ctx) {
            return
        }

        const coeff = (Math.sin((Date.now() - dot.birth)*0.001*dot.speed)+1)*.5
        const size = coeff*dot.size
        this.ctx.beginPath()
        this.ctx.fillStyle = dot.color
        this.ctx.strokeStyle = dot.color
        if (dot.shape==="circle") {
            this.ctx.arc(dot.x, dot.y, size*.5, 0, Math.PI*2.)
            this.ctx.lineWidth = 0
            this.ctx.fill()
        } else if (dot.shape==="square") {
            this.ctx.rect(dot.x-size*.5, dot.y-size*.5, size, size)
            this.ctx.lineWidth = 0
            this.ctx.fill()
        } else {
            this.ctx.moveTo(dot.x - size*.5, dot.y)
            this.ctx.lineTo(dot.x + size*.5, dot.y)
            this.ctx.moveTo(dot.x, dot.y - size*.5)
            this.ctx.lineTo(dot.x, dot.y + size*.5)
            this.ctx.lineWidth = 5*coeff   
            this.ctx.stroke()
        }
    }

    drawFrame = () => {
        if (this.ctx && this.ref) {
            this.ctx.clearRect(0, 0, this.ref.width, this.ref.height)
            this.state.data.forEach(dot => {
                this.drawDot(dot)
            })
            this.timerId = requestAnimationFrame(this.drawFrame)
        }
    }

    componentDidMount() {
        if (this.ref) {
            this.ctx = this.ref.getContext('2d')
            if (this.props.count) {
                let dots: Dot[] = []
                for (let i=0; i<this.props.count; i++) {
                    dots.push(this.generateDot(Math.floor(Math.random()*this.ref.width), Math.floor(Math.random()*this.ref.height)))
                }
                this.setState({
                    data: dots
                })
            }

            if (this.ctx) {
                this.timerId = requestAnimationFrame(this.drawFrame)
            }
        }
    }

    componentWillUnmount() {
        if (this.timerId!==null) {
            cancelAnimationFrame(this.timerId)
        }
    }

    render() {
        return (
            <div style={{display: "flex", justifyContent: "center", margin: "40px auto"}}>
            <canvas
                ref={c=>this.ref=c}
                width={640}
                height={320}
                style={{border: "5px inset brown"}}
                onClick={(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>)=>{
                    if (this.ref) {
                        const x = e.pageX - this.ref.offsetLeft
                        const y = e.pageY - this.ref.offsetTop
                        this.addDot(x, y)
                    }
                }}
            ></canvas>
            </div>
        )
    }
}

export default Homework

/*

napisati komponentu koja:
    - koristiti TypeScript (cela komponenta je jedan .tsx fajl)
    - na klik na kanvas se stvara oblik koji pulsira
    - randomizovani boja, maksimalna velicina, brzina pulsiranja i oblik (krug ili kvadrat ili plusic)
    - povesti racuna da se sve inicijalizuje u korektnim trenucima i da se svi resursi brisu kada nisu potrebni
    - komponenta prima opcioni prop broj koji predstavlja broj unapred napravljenih sasvim randomizovanih oblika

nesto sto pravi tip
sto pravi generic
sto koristi Partial
koristi literale

*/