const button = document.getElementById("btn")


const prefixgetNextGreater = (water) => {
    let maxElement = -1
    const result = Array.from(water).fill(-1)
    for(let i=0;i<water.length;i++){
        if(maxElement  < water[i]){
            result[i] = -1;
            maxElement = water[i];
        }
        else{
            result[i] = maxElement;
        }
    }
    return result;
}


const suffixgetNextGreater = (water) => {
    const result = Array.from(water).fill(-1)
    let maxElement = -1
    for(let i=water.length-1;i>=0;i--){
        if(maxElement  < water[i]){
            result[i] = -1;
            maxElement = water[i];
        }
        else{
            result[i] = maxElement;
        }
    }
    return result;
}


function getNode(n, v) {
    n = document.createElementNS("http://www.w3.org/2000/svg", n);
    for (var p in v)
    n.setAttributeNS(null, p.replace(/[A-Z]/g, function(m, p, o, s) { return "-" + m.toLowerCase(); }), v[p]);
    return n
  }


const generateDiagram = (water, water_stored) => {
    const diagramBody = document.getElementById("diagram")

    diagramBody.removeChild(diagramBody.firstChild)

    const root = getNode("svg", {width:800, height:500,  transform:"scale(1 -1)"})


    const initialBarHeight = 10
    const initialBarWidth = 50

    for(let i=0;i<water.length;i++){
        const currHeight = initialBarHeight * water[i]
        const waterHeight = initialBarHeight * water_stored[i] 

        const first = getNode("rect", {x:(10 + initialBarWidth*i), y:(0), width:initialBarWidth, height:currHeight, fill:"#ffa500", strokeWidth:"1", stroke:"black"})
        const second = getNode("rect", {x:(10 + initialBarWidth*i), y:(currHeight), width:initialBarWidth, height:waterHeight, fill:"#6a5acd"})
        root.appendChild(first)
        root.appendChild(second)
    }


    diagramBody.appendChild(root)

}



const fillWater = (water) => {

    const prefix = prefixgetNextGreater(water)

    const suffix = suffixgetNextGreater(water)

    const water_stored = []
    
    for(let i=0;i<water.length;i++){
        const smaller = Math.min(prefix[i], suffix[i]);
        if(water[i] < smaller){
            water_stored.push(smaller - water[i])
        }
        else{
            water_stored.push(0)
        }
    }
    console.log(water_stored)

    generateDiagram(water, water_stored)


}


button.onclick = ((event) => {
    const arrString = document.getElementById("arrElement").value
    const arr = arrString.split(",").map((item)=>parseInt(item))
    fillWater(arr)  
    return arr
})


