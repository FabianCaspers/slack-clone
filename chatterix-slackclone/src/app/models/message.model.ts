export class Message {
    authorId: string;
    messageText: string;

    constructor(obj?: any) {
        this.authorId = obj ? obj.authorId : '';
        this.messageText = obj ? obj.messageText : '';
    }

    /*public toJSON() {
        return {
            authorId: this.authorId,
            messageText: this.messageText
        }
    }*/
}