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
                                    q.Casefold(req.body.userEmail)
                                ),
                                q.Match(
                                    q.Index('marked_countries_by_code'),
                                    req.body.countryCode
                                )
                            ])
                        )
                    ),
                    q.Create(
                        q.Collection('marked_countries'),
                        {
                            data: {
                                userEmail: req.body.userEmail,
                                countryCode: req.body.countryCode,
                                marked: true,
                                countryName: req.body.countryName
                            }
                        }
                    ),
                    q.Replace(
                        q.Select(
                            "ref",
                            q.Get(
                                q.Intersection([
                                    q.Match(
                                        q.Index('marked_countries_by_email'),
                                        q.Casefold(req.body.userEmail)
                                    ),
                                    q.Match(
                                        q.Index('marked_countries_by_code'),
                                        req.body.countryCode
                                    )
                                ])
                            )
                        ),
                        {
                            data: {
                                userEmail: req.body.userEmail,
                                countryCode: req.body.countryCode,
                                marked: true,
                                countryName: req.body.countryName
                            }
                        }
                    )
                )
            );
            return res.status(200).end();
        } catch (error) {
            return res.status(400).end();
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method not allowed');
    }
}
