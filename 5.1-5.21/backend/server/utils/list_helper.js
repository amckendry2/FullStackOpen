const dummy = blogs => {
    return 1
}

const totalLikes = posts => {
    return posts.reduce((a, c) => a + c.likes, 0)
}

const favoriteBlog = blogs => {
    const favorite = blogs.reduce((a, c) => c.likes > a.likes ? c : a, blogs[0])
    return favorite ? {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    } 
    : null
}

const mostBlogs = blogs => {
    const cache = {}
    for(const blog of blogs){
        if (cache[blog.author]){
            cache[blog.author]++
        } else {
            cache[blog.author] = 1
        }
    }
    const topAuthor = Object.keys(cache).reduce((a, c) => 
        cache[c] > cache[a] ? c : a
    )
    return {
        author: topAuthor,
        blogs: cache[topAuthor]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}