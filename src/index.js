// 导出所有技能

const codeStyle = require('./skills/code-style');

module.exports = {
  skills: {
    codeStyle
  },
  
  // 获取技能列表
  getSkills() {
    return Object.keys(this.skills);
  },
  
  // 根据名称获取技能
  getSkill(name) {
    return this.skills[name];
  }
};
