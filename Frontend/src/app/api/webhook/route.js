import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req ,res) {
    const payload = await req.text()
    const response = JSON.parse(payload)
    const sig = req.headers.get("Stripe-Signature")
    const dateTime = new Date(response?.created * 1000).toLocaleDateString()
    const timeString = new Date(response?.created * 1000).toLocaleDateString()
    const relevantEvents = new Set([
        'product.created',
        'product.updated',
        'price.created',
        'price.updated',
        'checkout.session.completed',
      ]);
      
      try {
        if (!sig || !webhookSecret) return;
        event = stripeAdmin.webhooks.constructEvent(body, sig, webhookSecret);
      } catch (error) {
        return Response.json(`Webhook Error: ${(error).message}`, { status: 400 });
      }
    
      if (relevantEvents.has(event.type)) {
        try {
          switch (event.type) {
            case 'product.created':
            case 'product.updated':
              await upsertProduct(event.data.object );
              break;
            case 'price.created':
            case 'price.updated':
              await upsertPrice(event.data.object );
              break;
            case 'checkout.session.completed':
              const checkoutSession = event.data.object;
    
              if (checkoutSession.mode === 'subscription') {
                const subscriptionId = checkoutSession.subscription;
                await upsertUserSubscription({
                  subscriptionId: subscriptionId ,
                  customerId: checkoutSession.customer ,
                  isCreateAction: true,
                });
              }
              break;
            default:
              throw new Error('Unhandled relevant event!');
          }
        } catch (error) {
          console.error(error);
          return Response.json('Webhook handler failed. View your nextjs function logs.', {
            status: 400,
          });
        }
      }
      return Response.json({ received: true });
    }