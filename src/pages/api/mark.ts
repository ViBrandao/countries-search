/* eslint-disable import/no-anonymous-default-export */
import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";

import { fauna } from "../../services/fauna";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            await fauna.query(
                q.If(
                    q.Not(
                        q.Exists(
                            q.Intersection([
                                q.Match(
                                    q.Index('marked_countries_by_email'),
                                    q.Casefold(req.body.email)
                                ),
                                q.Match(
                                    q.Index('marked_countries_by_code'),
                                    req.body.code
                                )
                            ])
                        )
                    ),
                    q.Create(
                        q.Collection('marked_countries'),
                        {
                            data: {
                                email: req.body.email,
                                code: req.body.code
                            }
                        }
                    ),
                    q.Get(
                        q.Intersection([
                            q.Match(
                                q.Index('marked_countries_by_email'),
                                q.Casefold(req.body.email)
                            ),
                            q.Match(
                                q.Index('marked_countries_by_code'),
                                req.body.code
                            )
                        ])
                    )
                )
            )
            return res.status(200);

        } catch (error) {
            return res.status(400);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method not allowed');
    }
}
