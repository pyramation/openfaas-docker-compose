FUNC_FILE ?= './functions.yml'

templates:
	which faas-cli || (echo "Please install 'faas-cli' package" && exit 1)
	which jq || (echo "Please install 'jq' package" && exit 1)
	which yq || (echo "Please install 'yq' package" && exit 1)

	$(eval templates := $(shell cat ${FUNC_FILE} | yq r - -j | jq -r '.functions | values[].lang'))

	for template in $(templates) ; do \
		faas-cli template store pull $$template ; \
	done
.PHONY: templates
