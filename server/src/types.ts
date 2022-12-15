import { gql } from "apollo-server";
export type Gender = {
  gender: string;
  probability: number;
};
export type Nationality = {
  country_id: string;
  probability: number;
};
export type NameData = {
  name: string;
  gender: Gender;
  nationality: Nationality[];
};
export const typeDefs = gql`
  input NationalityInput {
    country_id: String
    probability: Float
  }
  input GenderInput {
    gender: String
    probability: Float
  }
  input NameDataInput {
    name: String
    gender: GenderInput
    nationality: [NationalityInput]
  }
  type Gender {
    gender: String
    probability: Float
  }
  type Nationality {
    country_id: String
    probability: Float
  }
  type NameData {
    name: String
    gender: Gender
    nationality: [Nationality]
  }
  type Success {
    success: Boolean
    message: String
  }

  type Query {
    namesData: [NameData]
  }
  type Query {
    nameData(name: String!): NameData
  }
  type Mutation {
    createNameData(data: NameDataInput): Success
  }
`;
