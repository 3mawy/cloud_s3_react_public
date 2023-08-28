export function filterPublic(items) {
    return items?.filter(item => isPublic(item.grants));
}
export function isPublic(grants) {
    return grants.some(grant =>
        (grant.Grantee.Type === 'Group' && grant.Grantee.URI === 'http://acs.amazonaws.com/groups/global/AllUsers')
    );
}