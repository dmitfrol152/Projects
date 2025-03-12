export default function getSettingJustValidate() {
  const validator = new JustValidate('.questions__form');
  validator
    .addField('#name', [
      {
        rule: 'required',
      },
      {
        rule: 'minLength',
        value: 3,
      },
      {
        rule: 'maxLength',
        value: 20,
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
      },
      {
        rule: 'required',
      },
      {
        rule: 'email',
      },
    ])
    .addField(
      '#agree',
      [
        {
          rule: 'required',
        },
      ]
    )
    return validator
}