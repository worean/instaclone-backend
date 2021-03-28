import { subscribe } from "graphql"
import { NEW_MESSAGE } from "../../constant"
import { pubsub } from "../../pubsub"

export default {
    Subscription : {
        roomUpdates : {
            subscribe: () => {
                return pubsub.asyncIterator(NEW_MESSAGE)
            }
        },
    }
}