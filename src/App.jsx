import UsersList from './components/UsersList';

const USERS = [
	{
		username: 'gerard',
		name: 'Gerard Roura',
		active: true,
		role: 'teacher'
	},
	{
		username: 'pepe',
		name: 'Pepe Marinez',
		active: true,
		role: 'student'
	},
	{
		username: 'ada',
		name: 'Ada Colau',
		active: false,
		role: 'student'
	}
];

const App = () => <UsersList initialUsers={USERS} />;

export default App;
