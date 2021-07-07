const baseURL = process.env.REACT_APP_API_URL || `https://api.github.com/users/` ;

export const getUserDetails = async (username) => {
    try {

        let url = `${baseURL}${username}`;
        const res = await fetch(url);

        if (!res.ok) {
            return null
        }

        const json = await res.json();
        return json;

    } catch (error) {
        return null
    }
};

export const getUserDiff = async (username) => {
    try {

        let url1 = `${baseURL}${username}/following`;
        const res1 = await fetch(url1);

        if (!res1.ok) {
            return null
        }

        const json1 = await res1.json();
        var following = []
        json1.forEach(async function (elem) {
            following.push(elem.login)
        })


        let url2 = `${baseURL}${username}/followers`;
        const res2 = await fetch(url2);

        if (!res2.ok) {
            return null
        }

        const json2 = await res2.json();
        var followers = []
        json2.forEach(async function (elem) {
            followers.push(elem.login)
        })
        let listdata = await following.filter(x => !followers.includes(x));
        // console.log(listdata)
        return listdata;

    } catch (error) {
        return null
    }
};
