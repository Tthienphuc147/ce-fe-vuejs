export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Profile Manager',
        to: '/profile-manager',
        icon: 'cil-user',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Evaluation Manager',
        to: '/evaluation-manager/list',
        icon: 'cil-user',
      }
    ]
  }
]