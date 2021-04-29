const core = require('@actions/core');
const github = require('@actions/github');
const octokit = github.getOctokit(process.env.GITHUB_TOKEN)

try {
    const workflow = core.getInput('workflow');
    let statusesString = core.getInput('passing-statuses');
    let conclusionsString = core.getInput('passing-conclusions');

    let statuses = statusesString ? statusesString.split(',') : null
    let conclusions = conclusionsString ? conclusionsString.split(',') : null

    let workflowRuns = octokit.actions.listWorkflowRuns({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        workflow_id: workflow,
        per_page: 1
    });
    workflowRuns.then((response => {
        let data = response['data']
        if (data['total_count'] > 0) {
            let workflowRun = data['workflow_runs'][0]
            let workflowConclusion = workflowRun['conclusion']
            let workflowStatus = workflowRun['status']
            let message = `Workflow ${workflow} is in status ${workflowStatus} with a conclusion of ${workflowConclusion}`
            console.info(message)

            if ((conclusions == null || conclusions.includes(workflowConclusion)) && (statuses == null || statuses.includes(workflowStatus))) {
                core.setOutput("conclusion", workflowConclusion);
                core.setOutput("status", workflowStatus);
            } else {
                core.setFailed(message);
            }
        } else {
            let message = `Workflow ${workflow} has no previous executions`
            console.error(error)
            core.setFailed(message);
        }
    })).catch((error) => {
        console.error(error)
        core.setFailed(error);
    });

} catch (error) {
    core.setFailed(error.message);
}
