
const routesIcons =(focused,route)  =>  {
    switch(route) {
        case 'Home':
            return focused ? 'home': 'home-outline';
        case 'RiskScreen':
            return focused ?  'people': 'people-outline';
        case 'ReportScreen':
            return focused ? 'list': 'list-outline';
        case 'Worker':
            return focused ? 'person-add': 'person-add-outline';
    }
}

export default routesIcons;