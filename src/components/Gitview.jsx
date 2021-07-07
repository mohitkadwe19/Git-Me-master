import React, { useState } from 'react'
import { getUserDetails, getUserDiff } from '../apis/index.js'
function Gitview() {
    const [user, setUser] = useState(null)

    const [diff, setDiff] = useState([])
    const [input, setInput] = useState("");
    function getData() {
        if (input.trim() === "") {
            return;
        }
        else {
            async function fetchData() {
                const data = await getUserDetails(input);
                if (data) {
                    setUser(data)
                }
                else {
                    setUser(null)
                }
            }

            async function fetchDiff() {

                const data = await getUserDiff(input);
                if (data) {
                    setDiff(data)
                }
                else {
                    setDiff([])
                }

            }
            fetchData()
            fetchDiff()
        }
    }
    function handleEvent(e) {
        setInput(e.target.value)
    }
    return (
        <div>
            <form className="user-form" id="form" onSubmit={(e) => {
                e.preventDefault()
                getData()
            }}>
                <input type="text" id="search" onChange={handleEvent} placeholder="Search a Github User" autoComplete="off" />
                <button type="submit">Find</button>
            </form>

            {user == null ? (<div className="card">
                No Data found
            </div>) : (<><div className="card">
                <div>
                    <img src={user.avatar_url} alt="user" className="avatar" />
                </div>
                <div className="user-info">
                    {user.name == null ? (<h2>
                        {user.login}
                    </h2>) : (<h2>
                        {user.name}
                    </h2>)}

                    {user.bio == null ? null : (<p>
                        {user.bio}
                    </p>)}

                    <ul>
                        <li>{`${user.followers}`}<strong>Followers </strong></li>
                        <li>{`${user.following}`}<strong>Following </strong></li>
                        <li>{`${user.public_repos}`}<strong>Repos </strong></li>
                    </ul>
                </div>

            </div>
                <h3>People who don't follow back of given user : -</h3>
                {diff.length === 0 ? (<h5>Great not found any user who dont follow back you</h5>) : null}
                <ul>
                    {
                        diff.map((elem, index) => {
                            let link = `https://github.com/${elem}`
                            return (<li key={index}><a href={link}>{elem}</a></li>)})
                    }
                </ul>
            </>
            )}
        </div>
    )
}

export default Gitview
