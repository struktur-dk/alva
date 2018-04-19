import { Command } from './command';
import { PageRef } from '../page/page-ref';
import { Project } from '../project';
import { Store } from '../store';

export interface CreateProjectProps {
	previewFrame: string;
}

/**
 * A user operation that creates a Project with one empty page
 */
export class CreateProjectCommand extends Command {

	/**
	 * The project this command created.
	 */
	private project: Project;

	/**
	 * @inheritDoc
	 */
	public execute(): boolean {
		this.project = new Project({ previewFrame: '' });
		Store.getInstance().addProject(this.project);
		Store.getInstance().openProject(this.project.getId());

		// tslint:disable-next-line:no-unused-expression
		new PageRef({ project : this.project });

		return true;
	}

	/**
	 * @inheritDoc
	 */
	public getType(): string {
		return 'create-project';
	}

	/**
	 * @inheritDoc
	 */
	public undo(): boolean {
		Store.getInstance().removeProject(this.project);
		return true;
	}
}
