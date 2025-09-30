import {Chat, Money, Security} from "../components/Index";
import ExplainBank from "../components/ExplainBank";

export default function Explain() {
  const features = [
    {
      icon: Chat,
      title: "You are our #1 priority",
      text: "Need to talk to a representative? ..."
    },
    {
      icon: Money,
      title: "More savings means higher rates",
      text: "The more you save with us..."
    },
    {
      icon: Security,
      title: "Security you can trust",
      text: "We use top of the line encryption..."
    }
  ];

  return <ExplainBank features={features} />;
}