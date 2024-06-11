import logo from './logo.svg';
import UserList from './Components/UserList';

function App() {
  return (
    <div className='h-screen w-screen flex flex-col p-16'>
    <h1 className="text-3xl p-2">
      User List
    </h1>
      <UserList/>
    </div>
  );
}

export default App;
