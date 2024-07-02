"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { absoluteUrl } from "@/lib/utils";
import { getUserSubscription } from "@/app/(main)/courses/queries";
import { stripe } from "@/lib/stripe";

const returnUrl = absoluteUrl("/shop")
export const createStripeUrl = async () => {
    const { userId } = await auth();
    const user = await currentUser();
    if (!user || !userId) throw new Error("Unauthorized");
    const userSubscription = await getUserSubscription();

    if (userSubscription && userSubscription.stripeCustomerId) {
        //Already have a subscription
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url: returnUrl,
        });
        return { data: stripeSession.url }
    }
    const stripeSesson = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "INR",
                    product_data: {
                        name: "Lingo Pro",
                        description: "Unlimited Hearts"
                    },
                    unit_amount: 14900, //149 INR
                    recurring: {
                        interval: "month"
                    }
                }
            }
        ],
        metadata: {
            userId
        },
        success_url: returnUrl,
        cancel_url: returnUrl
    });
    return { data: stripeSesson.url }
}