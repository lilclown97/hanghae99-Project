class Site {
    constructor() {
        this.boards = [];
    }

    addBoard(board) {
        if (this.boards.find((x) => x.name === board.name)) throw Error;

        this.boards.push(board);
    }

    findBoardByName(name) {
        return this.boards.find((x) => x.name === name);
    }
}

class Board {
    constructor(name) {
        if (name === null || name === '') throw Error;

        this.name = name;

        this.articles = [];
    }

    publish(article) {
        if (this.inSite === false) throw Error;

        article.createdDate = new Date().toISOString();
        article.id = `${this.name}-${Math.random()}`;
        article.inBoard = true;
        this.articles.push(article);
    }

    getAllArticles() {
        return this.articles;
    }
}

class Article {
    constructor(article) {
        const { subject, content, author } = article;
        if (
            subject === null ||
            subject === '' ||
            content === null ||
            content === '' ||
            author === null ||
            author === ''
        ) {
            throw Error();
        }

        this.subject = subject;
        this.content = content;
        this.author = author;
        this.inBoard = false;
        this.comments = [];
    }

    reply(comment) {
        if (this.inBoard === false) throw Error;

        comment.createdDate = new Date().toISOString();
        this.comments.push(comment);
    }

    getAllComments() {
        return this.comments;
    }
}

class Comment {
    constructor(comment) {
        const { content, author } = comment;
        if (content === null || content === '' || author === null || author === '') throw Error();

        this.content = content;
        this.author = author;
    }
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};
