import { set1Corners } from '../availableMeshes/index';

const randomItem = (items) => {
    let item = items.sort(() => 0.5 - Math.random())[0];
    return item
}

export const meshCalcCorners = (mesh_calc_corners, sum) => {
    // now determine what corner
    let index_switch = mesh_calc_corners.findIndex(item => item.indicate === sum);
    // fail safe
    if (index_switch != -1) {
        let ease_index = index_switch + 1
        const res = null;
        switch (ease_index) {
            case 1:
                return randomItem(set1Corners)
            case 2:
                res = '/meshes/corners/set2/1.fbx'
                return null
            case 3:
                res = '/meshes/corners/set3/1.fbx'
                return null
            case 4:
                res = '/meshes/corners/set4/1.fbx'
                return null
        }
    }
}

export const meshCalcEdges = (mesh_calc_edges, sum) => {
    // now determine what corner
    let index_switch = mesh_calc_edges.findIndex(item => item.indicate.includes(sum));
    // fail safe
    if (index_switch != -1) {
        let ease_index = index_switch + 1
        const res = null;
        switch (ease_index) {
            case 1:
                res = '/meshes/edges/set1/1.fbx'
                return null
            case 2:
                res = '/meshes/edges/set2/1.fbx'
                return null
            case 3:
                res = '/meshes/edges/set3/1.fbx'
                return null
            case 4:
                res = '/meshes/edges/set4/1.fbx'
                return null
        }
    }
}