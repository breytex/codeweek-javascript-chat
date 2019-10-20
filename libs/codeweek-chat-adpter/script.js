
const subscribeToNewMessages = (newMessagesCallback) => {
    console.log("Subscribed to new messages")
    const wsclient = new SubscriptionClient(
        'ws://codingweek.herokuapp.com/v1/graphql',
        {
            reconnect: true,
            //   connectionParams: {
            //     headers: {
            //       'Authorization': `Bearer foobar`,
            //     }
            //   },
        }
    );

    wsclient.request({
        query: `
            subscription getMessages {
                messages(order_by: {created: asc}) {
                    content
                    id
                    created
                    user_name
                }
            }
      `
    }).subscribe({ next: (obj) => newMessagesCallback(obj.data.messages), error: console.error })
}



const graph = graphql("https://codingweek.herokuapp.com/v1/graphql", {
    method: "POST", // POST by default.
    headers: {

    },
    asJSON: true
})

const post = graph(`
    mutation createMessage($user_name: String, $content: String) {
        insert_messages(objects: {user_name: $user_name, content: $content}) {
            returning {
                id
            }
        }
    }
`)

const addMessage = async (user_name, content) => {
    try {
        await post({ user_name, content })
    } catch (e) {
        console.error(e)
    }
}

