# Talk track: Vercel Schedules at Saltbush Retail (about 2.5 minutes)

Fictional company, simulated numbers. Move with Next and Back or the arrow keys.

**1. The issue** [point at the chat]
Every retailer I talk to in ANZ now has an agent in customer service. It can browse orders and prices live. What it can’t do is book work for later. This is Saltbush Retail, a made-up Sydney retailer. A customer asks the agent to recheck a coat price in three days. The agent has to say: I need an engineer to add a cron. [point at the tiles] A hundred and eighty-six follow-up requests a week. Forty-one percent of them are not due in this conversation. Two engineers own every cron change.

**2. Without Schedules** [click Next]
Here’s how they do it today. Timing lives in vercel.json. Change a schedule, add a one-off, cancel one — edit the file, redeploy. [point at the right card] Ticket to engineering, one to two business days. One-time “in three days” jobs aren’t supported, so they built a poller that wakes every fifteen minutes and scans a follow-ups table. Eighteen thousand dollars a year of compute that mostly finds nothing, and jobs still land late when the poller is busy.

**3. The moment** [click Next]
Here’s the issue in one conversation. Maya asks: if the Merino coat drops below four-twenty in the next three days, SMS me. Otherwise don’t bother me. The agent already has the product, the threshold and her consent. [point at the red reply] It still can’t create a job that runs after this chat ends. Two days to book it through engineering. Maya’s window is three days. The coat drops to three-ninety-nine on day two. Nobody messages her. Lost sale.

**4. With Schedules** [click Next, then “Create schedule”]
Now, what we solve. Vercel Schedules. The agent calls the JS SDK mid-conversation. One-time job, Australia/Sydney, delivers to a queue topic when it’s due. [wait for the green confirmation] One point two seconds. No vercel.json edit. No redeploy. And it runs outside the sandbox — the chat can end, Vercel still fires the job on Monday morning. [point at the agent reply] The agent tells Maya: done, I’ll SMS you only if it’s under four-twenty.

**5. The value** [click Next, point at the four tiles]
So for Saltbush: two days to book a follow-up becomes one point two seconds. Forty-seven redeploys a year for schedule changes become zero. Three hundred and sixty-eight engineering hours back. About six hundred and forty thousand dollars a year in recovered sales and engineer cost avoided. Why do customers love it? Agents book their own work. One-time and recurring from the same API. And the job survives after the sandbox ends. If your agents can help now but can’t book later, I’d love to show you this on your own stack.
