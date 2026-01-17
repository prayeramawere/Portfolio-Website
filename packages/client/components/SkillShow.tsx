import React from "react";
import Skill from "./Skill";

function SkillShow({ skills }: { skills: string[] }) {
  return skills.map((skill: any) => <Skill skill={skill} />);
}

export default SkillShow;
