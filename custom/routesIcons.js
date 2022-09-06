
const routesIcons =(focused,route)  =>  {
    switch(route) {
        case 'Inicio':
            return focused ? 'home': 'home-outline';
        case 'Empleados':
            return focused ?  'people': 'people-outline';
        case 'ReportScreen':
            return focused ? 'list': 'list-outline';
    }
}

export default routesIcons;