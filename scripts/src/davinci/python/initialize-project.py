import DaVinciResolveScript as dvr_script
from inspect import getsourcefile
from os.path import abspath
import os

resolve = dvr_script.scriptapp("Resolve")
fusion = resolve.Fusion()
projectManager = resolve.GetProjectManager()
dirname = os.path.dirname(abspath(getsourcefile(lambda:0)))
rootPath = os.path.join(dirname, '../../../..')

projectName = os.environ['PROJECT_NAME']

project = projectManager.CreateProject(projectName)

if project == None:
	project = projectManager.LoadProject(projectName)
	if project == None:
		print("Error: project doesn't exist and a new project couldn't be created.")
	else:
		print("Project already exists.")
else:
	# Add the compositions into the project's media pool
	mediaStorage = resolve.GetMediaStorage()
	compositionFilesFolder = os.path.join(rootPath, './assets/davinci/composition-files')
	clips = mediaStorage.AddItemListToMediaPool([os.path.abspath(x) for x in os.listdir()])

	# Import the compositions from the media pool into the timeline
	mediaPool = project.GetMediaPool()
	mediaPool.CreateTimelineFromClips("Compositions", clips)
