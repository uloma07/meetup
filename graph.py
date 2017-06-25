import json

def main(file_name):
    result = {}

    data = json.load(open(file_name))
    for user_key, user_groups in data.items():
        for group in user_groups:
            if result.get(group['id'], None) is None:
                result[group['id']] = {
                    "name": group['name'],
                    "count_of_members": 1
                }
            else:
                result[group['id']]['count_of_members']+= 1
    
    # Save the result to a file
    with open('result.json', 'w') as outfile:
        json.dump(result, outfile)

if __name__ == '__main__':
    print(main("data.json"))