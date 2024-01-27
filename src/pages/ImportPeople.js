import useUser from '../hooks/useUser';



const ImportPeople = () =>
{

    const {user} = useUser();

    return
    (
        <>
        <h1>Test</h1>
        { user.name === "welchie99@gmail.com" ? (<><h2>Hello {user.name}</h2></>) : <>{user.name}</>}
        </>
    );
}

        export default ImportPeople;