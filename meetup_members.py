#!/usr/bin/env python3

import requests
import json
import sys

api_url = 'https://api.meetup.com/2/'
grouptopics = {}



def main(argv):

    page_size = 200

    api_key = argv[0]
    group_urlname = argv[1]
    if(len(argv) > 2):
        page_size = argv[2]
    
    get_members(api_key, group_urlname, page_size)
    #get_user_groups(api_key, group_urlname , page_size)



def get_members(api_key, group_urlname, page_size=200):

    results = None
    users = []
    query = 'members'

    request_string = '{}{}?key={}&group_urlname={}&page={}'.format(api_url, query, api_key, group_urlname, page_size)

    while True:

        # print(request_string)

        r = requests.get(request_string)
        try:
            results = json.loads(r.content.decode('utf-8'))
        except Exception as e:
            print(e)

        #print(results)
        
        num = len(results['results'])
        users += results['results']

        # print(num)

        try:
            if len(results['meta']['next']) <= 0:
                break
        except e:
            print(e)
            break

        request_string = results['meta']['next']
    
    usergroups = {}
    #usertopics = {}
    for user in users:
        user_id = user["id"]
        usergroups[f"{user_id}"] = get_user_groups(api_key,user_id)

    with open("usergroups.json", 'w') as f:
        f.write(json.dumps(usergroups, indent=2))
    
    with open("grouptopics.json", 'w') as f:
        f.write(json.dumps(grouptopics, indent=2))


    
    print()


def get_user_groups(api_key, member_id , page_size=200):
    
    results = None
    groups = []
    query = 'groups'
    request_string = f'{api_url}{query}?key={api_key}&member_id={member_id}&page={page_size}&only=id,link,rating,urlname,name,category.name,topics,members,topics.urlkey'

    while True:

        # print(request_string)

        r = requests.get(request_string)
        try:
            results = json.loads(r.content.decode('utf-8'))
        except Exception as e:
            print(e)

        #print(results)
        
        num = len(results['results'])
        groups += results['results']

        # print(num)

        try:
            if len(results['meta']['next']) <= 0:
                break
        except e:
            print(e)
            break

        request_string = results['meta']['next']

    #print(json.dumps(groups, indent=2))
    groupvals = []
    
    for group in groups:
         groupvals.append({"id":group["id"], "name":group['urlname']})
         if (group['id'],group['urlname']) not in grouptopics.keys():
            grouptopics[f"{group['id']}:{group['urlname']}"] = group["topics"]
    return groupvals


if __name__ == "__main__":
    main(sys.argv[1:])