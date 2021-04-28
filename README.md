# Workflow Check action

Checks the last execution of a workflow for statuses and conclusions.

## Inputs

### `workflow`

**Required** The ID of the workflow. You can also pass the workflow file name as a string.

### `passing-statuses`

**Optional** A list of workflow statuses that will pass this action, if not provided, the action will succeed. If provided, both passing conditions need to be fulfilled. Can be one of: “queued”, “in_progress”, or “completed”.

### `passing-conclusions`

**Optional** A list of workflow conclusions that will pass this action, if not provided, the action will succeed. If provided, both passing conditions need to be fulfilled. Can be one of the “success”, “failure”, “neutral”, “cancelled”, “skipped”, “timed_out”, or “action_required”.

## Outputs

### `conclusion`

Can be one of the “success”, “failure”, “neutral”, “cancelled”, “skipped”, “timed_out”, or “action_required”.

### `status`

Can be one of: “queued”, “in_progress”, or “completed”.

## Example usage
```
uses: advancedcsg-open/mosaic-workflow-check-action@v1.0
with:
    workflow: 'sample-workflow.yml'
    passing-statuses: 'completed'
    passing-conclusions: 'success,error'
env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
