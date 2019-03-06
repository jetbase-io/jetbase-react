import { AbilityBuilder } from '@casl/ability';

export const defineRulesFor = (permissions) => {
  const { can, cannot, rules } = AbilityBuilder.extract();

  if (permissions && permissions.length > 0) {
    permissions.forEach((item) => {
      if (item.can) {
        can(item.action, item.entities);
      } else {
        cannot(item.action, item.entities);
      }
    });
  } else {
    cannot('read', 'all');
    cannot('update', 'all');
    cannot('delete', 'all');
  }

  return rules;
};

export default AbilityBuilder.define(() => {});
