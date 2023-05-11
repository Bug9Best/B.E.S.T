const { authenticate } = require('ldap-authentication')

async function main() {
    let authenticated = await authenticate({
        ldapOpts: { url: 'ldap://161.246.38.141' },
        userDn: 'it64070146@it.kmitl.ac.th',
        userPassword: 'Best1539..',
        userSearchBase: 'dc=it,dc=kmitl,dc=ac,dc=th',
        usernameAttribute: 'samaccountname',
        username: 'it64070146',
        attributes: ['dn', 'sn', 'cn'],
    })
    console.log(authenticated)
}