import { meshCalcCorners, meshCalcEdges } from "./meshesCalc";

export const createCorners = (x, y) => {
    let first_corner = 1
    let second_corner = (x * y) - (y - 1)
    let third_corner = y
    let fourth_corner = x * y

    let mesh_calc_corners = [
        { indicate: 1 },
        { indicate: second_corner },
        { indicate: third_corner },
        { indicate: fourth_corner }
    ]
    let first_corner_r = 1
    let second_corner_r = y
    let third_corner_r = (x * y) - (y - 1)
    let fourth_corner_r = x * y

    let first_render_calc_corners = [first_corner_r, second_corner_r, third_corner_r, fourth_corner_r]

    return {
        mesh_calc_corners, first_render_calc_corners
    }
}

export const createEdges = (c_1, c_2, c_3, c_4, yInteger) => {
    let first_edges = [];
    let second_edges = [];
    let third_edges = [];
    let fourth_edges = [];

    // calc first edges
    for (let index = c_1; index < c_2; index++) {
        // skipping first index cause it's a corner
        if (index != 1) {
            first_edges.push(index);
        }
    }

    // calc second edges
    for (let index = c_2; index < c_3; index = index + yInteger) {
        second_edges.push(index);
    }

    // calc third edges
    for (let index = c_2; index < c_3; index = index + yInteger) {
        third_edges.push(index + 1);
    }

    // calc fourth edges
    for (let index = c_3; index < c_4; index++) {
        fourth_edges.push(index);
    }

    // for calculating specific meshes
    let mesh_calc_edges = [
        { indicate: third_edges },
        { indicate: fourth_edges },
        { indicate: second_edges },
        { indicate: first_edges }
    ]

    let first_render_calc_edges = [...first_edges, ...second_edges, ...third_edges, ...fourth_edges]

    return {
        mesh_calc_edges, first_render_calc_edges
    }
}

// first pass ( just building the array )
export const FirstRenderBuildPuzzle = (x, y) => {
    let positions = [];
    for (let x_pos = 0; x_pos < x; x_pos++) {
        for (let y_pos = 0; y_pos < y; y_pos++) {
            positions.push({ x: x_pos * 15, y: y_pos * 15 })
        }
    }
    return positions;
}

// second pass ( adding color to the array and the parts of it)
export const SecondRenderBuildPuzzle = (x, y, positions) => {
    // corners
    let { first_render_calc_corners } = createCorners(x, y);
    let corners = first_render_calc_corners;
    // edges
    let { first_render_calc_edges } = createEdges(...corners, y);
    let edges = first_render_calc_edges;

    let sum = 0
    for (let index = 0; index < positions.length; index++) {
        sum += 1
        let first_type = corners.includes(sum) ? "corner" : edges.includes(sum) ? "edge" : "between";
        let c_position = positions[index];
        c_position["first_render"] = first_type

    }

    return positions;
}

// third pass ( adding a mesh to the array)
export const ThirdRenderBuildPuzzle = (x, y, positions) => {
    let mesh = null;

    // corners
    const { mesh_calc_corners, first_render_calc_corners
    } = createCorners(x, y);
    let corners = first_render_calc_corners;

    // edges
    const { mesh_calc_edges, first_render_calc_edges
    } = createEdges(...corners, y)

    // running
    let sum = 0
    for (let index = 0; index < positions.length; index++) {
        sum += 1
        // I am a corner uwu
        if (positions[index].first_render == "corner") {
            let mesh = meshCalcCorners(mesh_calc_corners, sum)
            positions[index]["mesh"] = mesh
        } else if (positions[index].first_render == "edge") {
            //console.log('ding dong ding, edge!')
            // let mesh_url = meshCalcEdges(mesh_calc_edges, sum)
            // positions[index].mesh_url = mesh_url
        } else {
            //console.log('ding ding ding, between!')
        }
    }

    return positions;
}