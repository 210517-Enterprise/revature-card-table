

export default function MyAccount({token}){

    const [user, updateUser]


    return (
        <>
            <div id="accountParentDiv">
                <h1>{token.first_name} {token.last_name}</h1>
                <h3>Username</h3>
                <button>Settings</button>

            </div>
            <div id="userGameStatsDiv">
                <table>

                </table>
            </div>

        </>
    );
}