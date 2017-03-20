angular
    .module('app')
    .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'components/home/home.html',
            controller: 'Home',
            controllerAs: 'vm'
        })
        .when('/network', {
            templateUrl: 'components/network/network.html',
            controller: 'Network',
            controllerAs: 'vm'
        })
        .when('/automata', {
            templateUrl: 'components/automata/automata.html',
            controller: 'Automata',
            controllerAs: 'vm'
        });
}