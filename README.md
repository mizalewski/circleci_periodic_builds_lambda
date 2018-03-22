# CircleCI Periodic Builds Lambda

Lambda for periodic schedule builds on CircleCI. It adds the missing feature for scheduling builds.

You can add this Lambda to your AWS account and use CloudWatch Events to schedule builds.

## How it works

CloudWatch sends an event to the Lambda function, which calls CircleCI API to schedule build.

## Usage

1. Create new Lambda function on your AWS account with code from the `index.js` file.
2. Next, you need to add CloudWatch Events as a trigger. In target, you need to expand *Configure input* options and select **Constant (JSON text)**.
3. In the displayed text field, please type below event:
```
{"circleToken": "your_circleci_token", "vcsType": "your_vcs_type", "project": "your_project_name", "branch": "branch_to_build"}
```
where:

- **your_circleci_token** - this is your CircleCI token for given project
- **your_vcs_type** - type of version control system: `bitbucket` or `github`
- **your_project_name** - the project name on CircleCI
- **branch_to_build** - branch, which you want to be build

## How to test your Lambda function

You can check your Lambda by creating a test event. The event should be the same as for CloudWatch Events trigger. 
