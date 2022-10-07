
const routesIcons =(focused,route)  =>  {
    switch(route) {
        case 'Tools':
            return focused ? 'construct': 'construct-outline';
        case 'RiskScreen':
            return focused ?  'people': 'people-outline';
        case 'Reporte':
            return focused ? 'list': 'list-outline';
        case 'Todo':
            return focused ? 'layers': 'layers-outline';
        case 'WorkerScreen':
            return focused ? 'person-add': 'person-add-outline';
    }
}

export default routesIcons;