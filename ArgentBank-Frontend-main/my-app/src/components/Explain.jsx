import {Chat, Money, Security} from "../components/Index";
import ExplainBank from "../components/ExplainBank";

export default function Explain() {
  const features = [
    {
      icon: Chat,
      title: "You are our #1 priority",
      text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
    },
    {
      icon: Money,
      title: "More savings means higher rates",
      text: "The more you save with us, the higher your interest rate will be!"
    },
    {
      icon: Security,
      title: "Security you can trust",
      text: "We use top of the line encryption to make sure your data and money is always safe."
    }
  ];

  return <ExplainBank features={features} />;
}