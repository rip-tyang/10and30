import { APIClass } from "aws-amplify"

export default async function insertFakeData(API: APIClass) {
    await API.put('api10and30', '/user', {
        body: {
            user_id: 'google_102849459282930481180',
            month: '2023-06',
            highlights: [
                {
                    date: '2023-06-01',
                    highlight: 'Start of June',
                }, 
                {
                    date: '2023-06-13',
                    highlight: 'Caicai B day',
                },
            ],
          }
    })

    await API.put('api10and30', '/user', {
        body: {
            user_id: 'google_102849459282930481180',
            month: '2023-05',
            highlights: [
                {
                    date: '2023-04-01',
                    highlight: 'Start of Aprial',
                }, 
                {
                    date: '2023-04-13',
                    highlight: 'random day',
                },
            ],
          }
    })
}