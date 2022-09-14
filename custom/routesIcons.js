
const routesIcons =(focused,route)  =>  {
    switch(route) {
        case 'Home':
            return focused ? 'home': 'home-outline';
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