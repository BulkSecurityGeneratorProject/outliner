package outliner.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of L3TableSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class L3TableSearchRepositoryMockConfiguration {

    @MockBean
    private L3TableSearchRepository mockL3TableSearchRepository;

}
